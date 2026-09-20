import { uploadApi } from '../api/upload.api';

export const ImageUploadService = {
  // Upload media (Image or Video) via Cloudinary API with fallback to Firebase storage
  async uploadImage(file, timeoutMs = 90000) {
    const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const isVideo = file.type?.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(file.name || '');
    const resourceType = isVideo ? 'video' : 'image';

    if (cloudinaryCloudName && cloudinaryPreset) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryPreset);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/${resourceType}/upload`,
          {
            method: 'POST',
            body: formData,
            signal: controller.signal
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Cloudinary ${resourceType} upload failed with status ${response.status}`);
        }

        const data = await response.json();
        return {
          name: file.name,
          url: data.secure_url || data.url,
          publicId: data.public_id,
          resourceType: data.resource_type || resourceType,
          isVideo
        };
      } catch (err) {
        console.warn(`Cloudinary ${resourceType} upload failed, falling back to Firebase Storage:`, err);
      }
    }

    // Firebase storage fallback with timeout protection
    return await uploadApi.uploadFile(file, isVideo ? 'videos' : 'products');
  }
};
