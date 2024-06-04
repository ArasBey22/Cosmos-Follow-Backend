import * as bcrypt from 'bcrypt';

export class EncryptionService {
  static hashPassword(password: string): string | PromiseLike<string> {
    throw new Error('Method not implemented.');
  }
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    // Kullanıcı oluşturma ve hash'i veritabanına kaydetme işlemleri
    return hash;
  }
  async comparePassword(password: string, storedHash: string): Promise<boolean> {
    // Kullanıcıyı bulma işlemleri ve aşağıdaki gibi şifre karşılaştırma
    // loginde compare password un çağrılıdığı yerde undefined mı değilmi kontrolü yap
    const isMatch = await bcrypt.compare(password, storedHash);
    return isMatch;
  }
}
