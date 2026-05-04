package dev.tarangpatil.api_gateway.core;

import java.util.List;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {

	private static final List<String> PUBLIC_PATHS = List.of("/api/user/register", "/api/user/login");

	@Override
	public int getOrder() {
		return -1;
	}

	private Mono<Void> onError(ServerWebExchange exchange, HttpStatus status) {
		exchange.getResponse().setStatusCode(status);
		return exchange.getResponse().setComplete();
	}

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		String path = exchange.getRequest().getURI().getPath();
		if (PUBLIC_PATHS.contains(path)) {
			return chain.filter(exchange);
		}

		String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return onError(exchange, HttpStatus.UNAUTHORIZED);
		}

		String token = authHeader.substring(7);
		if (!JwtUtils.isTokenValid(token)) {
			return onError(exchange, HttpStatus.UNAUTHORIZED);
		}
		Claims claims = JwtUtils.extractAllClaims(token);
		exchange = exchange
				.mutate()
				.request(exchange
						.getRequest()
						.mutate()
						.header("X-User-Id", claims.getSubject())
						.header("X-User-Email", claims.get("email", String.class))
						.build())
				.build();
		return chain.filter(exchange);
	}
}
