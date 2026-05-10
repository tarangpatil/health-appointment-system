package dev.tarangpatil.user_service.service;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import dev.tarangpatil.user_service.model.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtils {

    private static final SecretKey key = Keys
            .hmacShaKeyFor(Base64.getDecoder().decode(System.getenv("ACCESS_TOKEN_SECRET")));

    public static String generateToken(Users user) {
        if (key == null)
            throw new IllegalStateException("secret key is null");
        List<String> roles = user.getRoles().stream().map(i -> i.name()).toList();
        return Jwts
                .builder()
                .subject(user.getId() + "")
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("email", user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 12 * 60 * 60 * 1000))
                .claim("roles", roles)
                .signWith(key)
                .compact();
    }
}
