package com.example.myapplication;

import com.google.gson.annotations.SerializedName;

public class RegisterRequest {

    // Use the @serializedName("Table Attribute") to serialize the data to JSON format
    @SerializedName("first_name")
    private String first_name;

    @SerializedName("last_name")
    private String last_name;

    @SerializedName("username")
    private String username;

    @SerializedName("email")
    private String email;

    @SerializedName("password")
    private String password;

    @SerializedName("is_superuser")
    private int  is_superuser;

    @SerializedName("is_staff")
    private int is_staff;

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getIs_superuser() {
        return is_superuser;
    }

    // Initializing is_superuser = 0, as it is for user registration
    public void setIs_superuser(int is_superuser) {
        is_superuser = 0;
        this.is_superuser = is_superuser;
    }

    public int getIs_staff() {
        return is_staff;
    }

    // Initializing is_staff = 0, as it is for user registration
    public void setIs_staff(int is_staff) {
        is_staff = 0;
        this.is_staff = is_staff;
    }
}
