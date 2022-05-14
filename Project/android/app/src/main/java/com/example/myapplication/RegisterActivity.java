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

public class RegisterActivity extends AppCompatActivity {

    Button btnRegister;
    EditText regFirstname,regLastname,regUsername,regEmail,regPassword;
    TextView haveAccount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        btnRegister = findViewById(R.id.btnRegister);
        regFirstname = findViewById(R.id.registerFirstname);
        regLastname = findViewById(R.id.registerLastname);
        regUsername = findViewById(R.id.registerUsername);
        regEmail = findViewById(R.id.registerEmail);
        regPassword = findViewById(R.id.registerPassword);
        haveAccount = findViewById(R.id.login);


        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (TextUtils.isEmpty(regEmail.getText().toString()) || TextUtils.isEmpty(regUsername.getText().toString()) || TextUtils.isEmpty(regFirstname.getText().toString()) || TextUtils.isEmpty(regLastname.getText().toString()) || TextUtils.isEmpty(regPassword.getText().toString())){
                    String message = "Please enter all the details!";
                    Toast.makeText(RegisterActivity.this,message,Toast.LENGTH_LONG).show();

                }else {
                    RegisterRequest registerRequest = new RegisterRequest();
                    registerRequest.setFirst_name(regFirstname.getText().toString());
                    registerRequest.setLast_name(regLastname.getText().toString());
                    registerRequest.setUsername(regUsername.getText().toString());
                    registerRequest.setEmail(regEmail.getText().toString());
                    registerRequest.setPassword(regPassword.getText().toString());
                    registerUser(registerRequest);
                }

            }
        });



        haveAccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(RegisterActivity.this,LoginActivity.class));
            }
        });
        
    }

    public void registerUser(RegisterRequest registerRequest){

        Call<RegisterResponse> registerResponseCall = ApiClient.getService().registerUser(registerRequest);
        registerResponseCall.enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(Call<RegisterResponse> call, Response<RegisterResponse> response) {

                if (response.isSuccessful()){

                    String message = "User has been Registered!";
                    Toast.makeText(RegisterActivity.this,message,Toast.LENGTH_LONG).show();

                    startActivity(new Intent(RegisterActivity.this,LoginActivity.class));
                    finish();

                }else {
                    String message = "Username already taken or Password is not strong enough!";
                    Toast.makeText(RegisterActivity.this,message,Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<RegisterResponse> call, Throwable t) {

                String message = t.getLocalizedMessage();
                Toast.makeText(RegisterActivity.this,message,Toast.LENGTH_LONG).show();
            }
        });

    }
}