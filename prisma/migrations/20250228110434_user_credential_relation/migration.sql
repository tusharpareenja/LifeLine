-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;
