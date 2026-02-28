<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Professor extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password', 'department'];
    protected $hidden = ['password'];

    public function students() {
        return $this->hasMany(Student::class);
    }
}
