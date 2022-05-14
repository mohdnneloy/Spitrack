package com.example.myapplication;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;


// API to be inserted here
public interface UserService {

    // Login Django API using Djoser
    @POST("auth/jwt/create/")
    Call<LoginResponse> loginUser(@Body LoginRequest loginRequest);


    // Registration or Signup Django API using Djoser
    @POST("auth/users/")
    Call<RegisterResponse> registerUser(@Body RegisterRequest registerRequest);

}
