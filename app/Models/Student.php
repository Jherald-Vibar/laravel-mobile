<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name', 'student_id', 'professor_id', 'face_descriptor', 'photo'];

    public function professor() {
        return $this->belongsTo(Professor::class);
    }
}
