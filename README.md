# 🌌 Cosmos Follow Backend

**Cosmos Follow Backend**, dallar (branch), görevler, kullanıcılar ve projeler gibi iş birliği yapılarının yönetilebildiği, profesyonel bir backend uygulamasıdır. Kullanıcılar dallara atanabilir, görevler oluşturulabilir ve gerçek zamanlı sohbet yapılabilir. Proje, JWT, Google Calendar API, Socket.IO gibi modern teknolojilerle entegredir.

---

## 📌 Proje Özeti

- Kullanıcı yönetimi ve kimlik doğrulama
- Branch (dal) oluşturma ve kullanıcı ilişkilendirme
- CRUD işlemleri (create, read, update, delete)
- Swagger ile otomatik API dokümantasyonu
- JWT tabanlı token doğrulama
- Socket.IO ile gerçek zamanlı iletişim
- Google Calendar API entegrasyonu

---

## 🧰 Teknolojiler

- **Node.js & NestJS**
- **MySQL (XAMPP)**
- **TypeORM**
- **Swagger**
- **JWT**
- **Socket.IO**
- **Google Calendar API**

---

## 🔐 Kimlik Doğrulama ve Kayıt

### 🔹 Kullanıcı Kayıt Olma

```ts
@Post('register')
register(@Body() registerDto: RegisterDto)
```

**Request:**

```json
{
  "name": "Emir Aras",
  "email": "emir@example.com",
  "password": "securePassword"
}
```

**Response:**

```json
{
  "message": "Kayıt başarılı."
}
```

---

### 🔹 Kullanıcı Giriş Yapma (Login)

```ts
@Post('login')
login(@Body() loginDto: LoginDto)
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1..."
}
```

> Tüm korumalı endpoint’lere erişmek için bu token `Authorization: Bearer <token>` olarak gönderilmelidir.

---

## 🧑‍💼 Branch İşlemleri

### 🔸 Kullanıcıyı Dala Ekleme

> Bu işlem "takip" değil, bir kullanıcının organizasyonel bir birime (branch) eklenmesini sağlar.

```ts
@Post(':branch_id/add-user/:user_id')
addUsersToBranch(@Param('branch_id') id: number, @Param('user_id') userId: number)
```

---

### 🔸 Kullanıcıyı Daldan Çıkarma

```ts
@Post('remove/user/:id')
removeUserFromBranch(@Param('id') id: number)
```

---

### 🔸 Tüm Dalları Getir

```ts
@Get('tree')
getAllBranchesAsTree()
```

---

### 🔸 Tüm Kullanıcıları Getir

```ts
@Get('users')
findAllBranchUsers()
```

---

## 📄 CRUD Örnekleri

```ts
@Post('create')
createBranch(@Body() dto: CreateBranchDto)

@Post('update/:id')
updateBranch(@Param('id') id: number, @Body() dto: UpdateBranchDto)

@Post('delete/:id')
removeBranch(@Param('id') id: number)
```

---

## 🧱 Entity Örnekleri

### 🔸 User Entity

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
}
```

### 🔸 Branch Entity

```ts
@Entity()
export class Branch {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @ManyToMany(() => User, user => user.branches)
  users: User[];
}
```

---

## 📡 Socket.IO

Sohbet odalarında gerçek zamanlı mesajlaşma:

```ts
@SubscribeMessage('sendMessage')
handleMessage(@MessageBody() msg: MessageDto, @ConnectedSocket() client: Socket)
```

---

## 📅 Google Calendar API

Google hesabı ile yetkilendirme sonrası etkinlikleri alma işlemleri yapılır:

```ts
@Get('calendar/events')
getCalendarEvents()
```

---

## 🧪 Swagger API Belgelendirme

Tüm endpoint’ler otomatik belgelenmiştir:

🧭 Swagger arayüzü:  
```bash
http://localhost:3000/api
```

---

## 🚀 Kurulum

### 1. Reponun Klonlanması

```bash
git clone https://github.com/ArasBey22/Cosmos-Follow-Backend.git
cd Cosmos-Follow-Backend
```

### 2. Bağımlılıkların Kurulması

```bash
npm install
```

### 3. .env Dosyası

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=cosmos_db
JWT_SECRET=secretKey
```

### 4. XAMPP Üzerinde Veritabanı Oluştur

- `localhost/phpmyadmin` > Yeni Veritabanı: `cosmos_db`
- TypeORM otomatik olarak tabloları oluşturur (`synchronize: true`)

### 5. Uygulamayı Başlat

```bash
npm run start:dev
```

---

## 🧪 Test ve Postman

- Token bazlı giriş sonrası tüm işlemler test edildi.
- Postman koleksiyonları ile CRUD, kullanıcı yönetimi, calendar, socket işlemleri doğrulandı.

---

## 👨‍💻 Geliştirici

**Himmet Emir Aras**  
📍 Türkiye  
📧 emiraras765@gmail.com  
🔗 [github.com/ArasBey22](https://github.com/ArasBey22)

---

> Bu proje, profesyonel geliştirme deneyimi edinmek amacıyla bireysel olarak geliştirilmiş, JWT, Socket.IO, TypeORM ve Google API gibi birçok teknolojiyi bir araya getiren tam kapsamlı bir back-end uygulamasıdır.
