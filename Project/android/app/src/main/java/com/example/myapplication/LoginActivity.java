package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    Button btnLogin;
    EditText lgUsername, lgPassword;
    TextView noAccount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        btnLogin = findViewById(R.id.btnLogin);
        lgUsername = findViewById(R.id.loginUsername);
        lgPassword = findViewById(R.id.loginPassword);
        noAccount = findViewById(R.id.Signup);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (TextUtils.isEmpty(lgUsername.getText().toString()) || TextUtils.isEmpty(lgPassword.getText().toString())){
                    String message = "Please enter all the details!";
                    Toast.makeText(LoginActivity.this,message,Toast.LENGTH_LONG).show();

                }else {

                    LoginRequest loginRequest = new LoginRequest();
                    loginRequest.setUsername(lgUsername.getText().toString());
                    loginRequest.setPassword(lgPassword.getText().toString());
                    loginUser(loginRequest);
                }

            }
        });



        noAccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(LoginActivity.this,RegisterActivity.class));
            }
        });


    }
    public void loginUser(LoginRequest loginRequest){

        Call<LoginResponse> loginResponseCall = ApiClient.getService().loginUser(loginRequest);
        loginResponseCall.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {

                if (response.isSuccessful()){

                    String message = "User has been Logged In!";
                    Toast.makeText(LoginActivity.this,message,Toast.LENGTH_LONG).show();

                    startActivity(new Intent(LoginActivity.this,RegisterActivity.class));
                    finish();

                }else {
                    String message = "Username already taken or Password is not strong enough!";
                    Toast.makeText(LoginActivity.this,message,Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {

                String message = t.getLocalizedMessage();
                Toast.makeText(LoginActivity.this,message,Toast.LENGTH_LONG).show();
            }
        });

    }
}