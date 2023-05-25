package com.codecool.epg.controller;

import com.codecool.epg.model.Users;
import com.codecool.epg.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
//    private final JavaMailSender javaMailSender;

    public UserController(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

////     Endpoint for sending password reset email
//   @PostMapping("/users/forgot-password")
//   public void sendPasswordResetEmail(@RequestBody ResetPasswordRequest request) {
//       // Check if the email exists in the database
//       Users user = userService.findByEmail(request.getEmail());
//       if (user == null) {
//           // Email does not exist, handle the error accordingly
//           throw new IllegalArgumentException("Invalid email address");
//       }
//
//       // Generate a secure reset token
//       String resetToken = generateResetToken();
//
//       // Save the reset token and its expiration time for the user in the database
//       user.setResetToken(resetToken);
//       user.setResetTokenExpiry(getResetTokenExpiry());
//       userService.save(user);
//
//       // Prepare the email message
//       String recipientEmail = user.getEmail();
//       String subject = "Password Reset";
//       String message = "Click the following link to reset your password: "
//               + "http://localhost:3000/reset-password?token=" + resetToken;
//
//       // Send the email
//       sendEmail(recipientEmail, subject, message);
//   }
//
//      // Endpoint for resetting the password
//      @PostMapping("/users/reset-password")
//      public void resetPassword(@RequestBody ResetPasswordForm form) {
//          // Check if the reset token is valid and not expired
//          Users user = userService.findByResetToken(form.getResetToken());
//          if (user == null || isResetTokenExpired(user)) {
//              // Invalid or expired reset token, handle the error accordingly
//              throw new IllegalArgumentException("Invalid or expired reset token");
//          }
//
//          // Set the new password for the user
//          user.setPassword(passwordEncoder.encode(form.getNewPassword()));
//          // Clear the reset token and its expiry time
//          user.setResetToken(null);
//          user.setResetTokenExpiry(null);
//          userService.save(user);
//      }
//
//      // Helper method to send an email
//      private void sendEmail(String recipientEmail, String subject, String message) {
//          SimpleMailMessage email = new SimpleMailMessage();
//          email.setTo(recipientEmail);
//          email.setSubject(subject);
//          email.setText(message);
//          javaMailSender.send(email);
//      }
//
//      // Helper method to generate a secure reset token
//      private String generateResetToken() {
//          // Generate a random UUID as the reset token
//          return UUID.randomUUID().toString();
//      }
//
//     // Helper method to get the reset token expiry time (e.g., 24 hours from the current time)
//     private Date getResetTokenExpiry() {
//         Calendar calendar = Calendar.getInstance();
//         calendar.add(Calendar.HOUR_OF_DAY, 24); // Set the expiry time to 24 hours from the current time
//         return calendar.getTime();
//     }
//
//     // Helper method to check if the reset token has expired
//     private boolean isResetTokenExpired(Users user) {
//         Date resetTokenExpiry = user.getResetTokenExpiry();
//         if (resetTokenExpiry == null) {
//             return true;
//         }
//         return resetTokenExpiry.before(new Date());
//     }
  
    @GetMapping
    public Iterable<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Users getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/register")
    public Users createUser(@RequestBody Users users) {
        users.setPassword(encoder.encode(users.getPassword()));
        users.setRoles("ROLE_USER");
        return userRepository.save(users);
    }

    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Long id, @RequestBody Users updatedUsers) {
        Users users = userRepository.findById(id).orElse(null);
        if (users != null) {
            users.setUsername(updatedUsers.getUsername());
            users.setEmail(updatedUsers.getEmail());
            users.setPassword(updatedUsers.getPassword());
            userRepository.save(users);
        }
        return users;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
