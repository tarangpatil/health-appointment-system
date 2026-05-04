package dev.tarangpatil.api_gateway.core;

import java.util.Base64;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtils {

	private static final SecretKey secretKey = Keys
			.hmacShaKeyFor(Base64.getDecoder().decode(System.getenv("ACCESS_TOKEN_SECRET")));

	public static Claims extractAllClaims(String token) {
		return Jwts
				.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	public static boolean isTokenValid(String token) {
		try {
			extractAllClaims(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}
}