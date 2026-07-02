import { uploadApi } from '../api/upload.api';

export const ImageUploadService = {
  // Upload via Cloudinary API or fallback to Firebase storage
  async uploadImage(file) {
    const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (cloudinaryCloudName && cloudinaryPreset) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Cloudinary response failed');
        }

        const data = await response.json();
        return {
          name: file.name,
          url: data.secure_url,
          publicId: data.public_id
        };
      } catch (err) {
        console.warn('Cloudinary upload failed, falling back to Firebase Storage:', err);
      }
    }

    // Firebase storage fallback
    return await uploadApi.uploadFile(file, 'products');
  }
};
