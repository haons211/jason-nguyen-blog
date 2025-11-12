# Hướng Dẫn Sử Dụng Ảnh Trong Bài Viết MDX

## 📸 Tổng Quan

Blog của bạn đã được cấu hình để hỗ trợ nhiều cách thêm ảnh vào bài viết MDX. Tất cả ảnh đều được tối ưu tự động bởi Next.js Image component.

---

## 1️⃣ Ảnh Markdown Cơ Bản

### Cú pháp đơn giản:

```markdown
![Alt text](URL_hoặc_đường_dẫn)
```

### Ví dụ:

```markdown
![Beautiful sunset](https://images.unsplash.com/photo-123456?w=1200)
```

**Kết quả:**
- Ảnh được hiển thị với kích thước cố định (h-64 md:h-96)
- Có caption (chú thích) từ alt text
- Object-fit: contain (giữ tỷ lệ ảnh)
- Bo góc và spacing đẹp

---

## 2️⃣ Ảnh Full Width (Toàn Chiều Rộng)

Để ảnh hiển thị full width với object-cover, thêm `title=fullwidth`:

```markdown
![Description](URL "fullwidth")
```

### Ví dụ:

```markdown
![Mount Fuji landscape](https://images.unsplash.com/photo-123?w=1200 "fullwidth")
```

**Kết quả:**
- Ảnh sẽ có chiều cao lớn hơn (400px trên mobile, 600px trên desktop)
- Object-fit: cover (fill toàn bộ khung)
- Phù hợp cho ảnh phong cảnh, hero images

---

## 3️⃣ Ảnh Với Caption (Chú Thích)

Alt text tự động trở thành caption hiển thị dưới ảnh:

```markdown
![The famous Fushimi Inari Shrine with thousands of red torii gates](https://images.unsplash.com/photo-123?w=1200)
```

**Caption sẽ hiển thị:** "The famous Fushimi Inari Shrine with thousands of red torii gates"

---

## 4️⃣ Image Gallery Component (Bộ Sưu Tập Ảnh)

Để hiển thị nhiều ảnh trong một grid 2 cột:

```jsx
<ImageGallery images={[
  { src: "URL_1", alt: "Mô tả ảnh 1" },
  { src: "URL_2", alt: "Mô tả ảnh 2" },
  { src: "URL_3", alt: "Mô tả ảnh 3" },
  { src: "URL_4", alt: "Mô tả ảnh 4" }
]} />
```

### Ví dụ thực tế:

```jsx
<ImageGallery images={[
  { 
    src: "https://images.unsplash.com/photo-1606224326955-653f5c989ebc?w=800", 
    alt: "Takoyaki (octopus balls)" 
  },
  { 
    src: "https://images.unsplash.com/photo-1563438220522-10e7b74e28e7?w=800", 
    alt: "Matcha soft serve ice cream" 
  }
]} />
```

**Kết quả:**
- Grid 2 cột trên desktop, 1 cột trên mobile
- Mỗi ảnh có hover effect (zoom nhẹ)
- Chiều cao cố định 256px
- Object-fit: cover

---

## 5️⃣ Nguồn Ảnh

### A. Ảnh Từ Internet (Remote Images)

Ảnh từ các domain được whitelist trong `next.config.ts`:

```markdown
![Image](https://images.unsplash.com/photo-123456?w=1200)
![Image](https://avatars.githubusercontent.com/u/123456)
![Image](https://logo.clearbit.com/company.com)
```

**Domains được hỗ trợ:**
- ✅ `images.unsplash.com` - Unsplash photos
- ✅ `avatars.githubusercontent.com` - GitHub avatars
- ✅ `logo.clearbit.com` - Company logos
- ✅ `photos.fife.usercontent.google.com` - Google Photos

### B. Ảnh Local (Trong Project)

Đặt ảnh trong thư mục `public/`:

```
/public
  /images
    /life
      /japan-trip-1.jpg
      /japan-trip-2.jpg
    /blog
      /diagram.png
```

Sử dụng trong MDX:

```markdown
![My photo](/images/life/japan-trip-1.jpg)
```

### C. Thêm Domain Mới

Nếu muốn thêm domain khác, edit file `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    // ... existing patterns
    {
      protocol: 'https',
      hostname: 'your-domain.com',
      port: '',
      pathname: '/**',
    },
  ],
},
```

---

## 6️⃣ Tối Ưu Hóa Ảnh

### Kích Thước Ảnh Khuyến Nghị:

| Loại Ảnh | Chiều Rộng Khuyến Nghị | Format |
|----------|------------------------|--------|
| Ảnh thường | 1200px - 1600px | JPEG/WebP |
| Ảnh full width | 1920px - 2400px | JPEG/WebP |
| Gallery images | 800px - 1200px | JPEG/WebP |
| Thumbnail | 400px - 800px | JPEG/WebP |

### URL Parameters (Unsplash):

```markdown
?w=1200          # Width
?h=800           # Height
?fit=crop        # Crop mode
?q=80            # Quality (1-100)
```

**Ví dụ:**
```markdown
![Photo](https://images.unsplash.com/photo-123?w=1200&h=800&fit=crop&q=85)
```

---

## 7️⃣ Best Practices

### ✅ Nên Làm:

1. **Luôn có alt text** - Tốt cho SEO và accessibility
2. **Sử dụng URL có width parameter** - Tối ưu tốc độ tải
3. **Chọn kích thước phù hợp** - Không dùng ảnh quá lớn
4. **Dùng WebP/AVIF** khi có thể - Next.js tự động convert
5. **Đặt tên file có ý nghĩa** - `japan-temple.jpg` thay vì `IMG_001.jpg`

### ❌ Tránh:

1. ❌ Alt text trống hoặc vô nghĩa: `![image](url)`
2. ❌ Ảnh quá nặng (>5MB) mà không tối ưu
3. ❌ Dùng ảnh từ domain không được whitelist
4. ❌ Quá nhiều ảnh trong một bài (>15-20 ảnh)

---

## 8️⃣ Ví Dụ Hoàn Chỉnh

```mdx
---
title: "My Travel Story"
description: "Amazing journey"
date: "2024-11-12"
thumbnail: "https://images.unsplash.com/photo-123?w=800"
---

# My Travel Story

Đây là bức ảnh đầu tiên - ảnh thường:

![Beautiful landscape](https://images.unsplash.com/photo-123?w=1200 "Peaceful countryside")

Đây là ảnh full width cho khoảnh khắc ấn tượng:

![Sunset panorama](https://images.unsplash.com/photo-456?w=1920 "fullwidth")

Và đây là gallery với nhiều ảnh:

<ImageGallery images={[
  { src: "https://images.unsplash.com/photo-789?w=800", alt: "Photo 1" },
  { src: "https://images.unsplash.com/photo-012?w=800", alt: "Photo 2" },
  { src: "https://images.unsplash.com/photo-345?w=800", alt: "Photo 3" },
  { src: "https://images.unsplash.com/photo-678?w=800", alt: "Photo 4" }
]} />

## Kết luận

Ảnh local cũng hoạt động tốt:

![My photo](/images/life/my-photo.jpg "Local image example")
```

---

## 9️⃣ Troubleshooting

### Ảnh không hiển thị?

**Checklist:**
1. ✅ URL có đúng không?
2. ✅ Domain có trong whitelist của `next.config.ts`?
3. ✅ File ảnh có tồn tại trong `/public`?
4. ✅ Syntax markdown có đúng không?
5. ✅ Build lại app sau khi thay đổi config

### Ảnh bị mờ?

- Thêm parameter `?w=` với giá trị lớn hơn
- Kiểm tra quality parameter `?q=`

### Ảnh load chậm?

- Giảm kích thước ảnh
- Sử dụng format WebP
- Tối ưu số lượng ảnh trong bài

---

## 🎨 Components Khác

### Callout với ảnh:

```jsx
<Callout type="info">
![Tip icon](/images/icons/tip.png)

**Pro Tip**: Always backup your photos before editing!
</Callout>
```

---

## 📚 Tài Nguyên

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Unsplash API](https://unsplash.com/developers)
- [MDX Documentation](https://mdxjs.com/)

---

Chúc bạn viết blog vui vẻ! 🎉

