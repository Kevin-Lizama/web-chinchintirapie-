package com.bootcamp.chinchintirapie.auth.dto;

import com.bootcamp.chinchintirapie.user.model.Role;

public record AuthResponseDto(
        String token,
        String tokenType,
        Long userId,
        String fullName,
        String email,
        Role role
) {
}
