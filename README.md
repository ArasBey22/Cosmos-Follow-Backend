# Cosmos Follow Backend

Profesyonel bir backend API projesi. Kullanıcı yönetimi, görev takibi, gerçek zamanlı sohbet ve Google Calendar entegrasyonu içerir.

---

## 🎯 Özellikler

- Kullanıcı kayıt/giriş sistemi
- JWT tabanlı kimlik doğrulama
- CRUD işlemleri
- Gerçek zamanlı mesajlaşma
- Google Calendar API entegrasyonu
- Swagger API dokümantasyonu

---

## 🛠 Teknolojiler

- **Node.js & NestJS**
- **MySQL & TypeORM**
- **JWT Authentication**
- **Socket.IO**
- **Swagger**
- **Google Calendar API**

---

## 🔐 Kimlik Doğrulama

### Kayıt Olma
```json
POST /auth/register
{
  "name": "Emir Aras",
  "email": "emir@example.com",
  "password": "securePassword"
}
```

### Giriş Yapma
```json
POST /auth/login
{
  "email": "emir@example.com",
  "password": "securePassword"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1..."
}
```

---

## 📊 CRUD İşlemleri

Kullanıcılar, projeler ve görevler için tam CRUD desteği:

```typescript
// Create
@Post('create')
create(@Body() createDto: CreateDto)

// Read
@Get()
findAll()

// Update
@Put(':id')
update(@Param('id') id: number, @Body() updateDto: UpdateDto)

// Delete
@Delete(':id')
remove(@Param('id') id: number)
```

---

## 💬 Gerçek Zamanlı Sohbet

Socket.IO ile anlık mesajlaşma:

```typescript
@SubscribeMessage('sendMessage')
handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket)
```

---

## 📅 Google Calendar Entegrasyonu

Google hesabı ile etkinlik yönetimi:

```typescript
@Get('calendar/events')
getCalendarEvents()
```

---

## 📚 API Dokümantasyonu

Swagger UI: `http://localhost:3000/api`

---

## 🚀 Kurulum

1. **Repo'yu klonlayın**
```bash
git clone https://github.com/ArasBey22/Cosmos-Follow-Backend.git
cd Cosmos-Follow-Backend
```

2. **Bağımlılıkları kurun**
```bash
npm install
```

3. **Environment dosyası oluşturun (.env)**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=cosmos_db
JWT_SECRET=secretKey
```

4. **Veritabanını hazırlayın**
- XAMPP'ı başlatın
- `localhost/phpmyadmin` > `cosmos_db` adında veritabanı oluşturun

5. **Uygulamayı başlatın**
```bash
npm run start:dev
```

---

## 🧪 Test

Postman koleksiyonları ile tüm endpoint'ler test edilmiştir:
- Authentication işlemleri
- CRUD operasyonları  
- Socket.IO mesajlaşma
- Google Calendar API

---

## 👨‍💻 Geliştirici

**Himmet Emir Aras**  
📧 emiraras765@gmail.com  
🔗 [github.com/ArasBey22](https://github.com/ArasBey22)

---

*Modern backend teknolojilerini öğrenmek ve pratik deneyim kazanmak amacıyla geliştirilmiş tam kapsamlı bir API projesidir.*
