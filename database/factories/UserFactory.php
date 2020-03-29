<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function ($faker,$params) {
    $is_admin = $params['is_admin'];
    if($is_admin)
    {
        return [
            'name' => 'admin',
            'password' => Hash::make('admin'), // password
            'remember_token' => Str::random(10),
            'is_admin' => true
        ];
    }
    else
    {
        return [
            'name' => 'user',
            'password' => Hash::make('user1'), // password
            'remember_token' => Str::random(10),
            'is_admin' => false
        ];
    }
    
});
