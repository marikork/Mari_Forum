package com.myforum.myforum.config;

import org.springframework.beans.factory.annotation.Autowired;
import com.myforum.myforum.dao.UserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.Customizer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.*;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig
{
    // JwtAuthFilter -> UserDetailsService -> InMemoryUser -> SecurityContextHolder
    private final JwtAuthFilter jwtAuthFilter;
    private final UserDao userDao;

    @Value("${spring.websecurity.debug:false}")
    boolean webSecurityDebug;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.debug(webSecurityDebug);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        /*
        return http
                .csrf(csrf -> csrf.disable())
                .httpBasic().disable()
                .cors(withDefaults())
                .build();
        */
        http
                .csrf().disable()
                .cors(withDefaults())
                .authorizeRequests()
                .antMatchers("/**/**/**") // allow all from auth
                .permitAll()
                .anyRequest()
                .authenticated()// any request is authneticated
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) // use Jwt filter before username/pword filter
        ;

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // don't encrypt
        //return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                return userDao.findUserByEmail(email);
            }
        };
    }

    /*
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .securityMatcher("/api/**")
                .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/user/**").hasRole("USER") //.permitAll()
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public UserDetailsService users(){
        UserDetails admin = User.builder()
                .username("admin")
                .password("password")
                .roles("ADMIN")
                .build();
        UserDetails user = User.builder()
                .username("user")
                .password("password")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }
    */


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST"));
        //corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setExposedHeaders(Arrays.asList("Authorization"));
        // CorsConfiguration configuration = new CorsConfiguration();
        // configuration.setAllowedOrigins(Arrays.asList("*"));
        // configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }


}
