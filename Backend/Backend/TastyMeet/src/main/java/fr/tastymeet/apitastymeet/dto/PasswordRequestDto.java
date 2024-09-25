package fr.tastymeet.apitastymeet.dto;

public class PasswordRequestDto {
        private String currentPassword;
        private long id;
        private String newPassword;
        private String confirmNewPassword;

        // Getters et Setters
        public String getCurrentPassword() {
            return currentPassword;
        }

        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmNewPassword() {
        return confirmNewPassword;
    }

    public void setConfirmNewPassword(String confirmNewPassword) {
        this.confirmNewPassword = confirmNewPassword;
    }
}
