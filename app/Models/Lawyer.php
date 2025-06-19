<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Lawyer extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'age', 'password', 'photo', 'certificate', 'specialization_id',
    ];

    protected $hidden = ['password', 'remember_token'];

    public function specializations()
    {
        return $this->belongsToMany(
            Specialization::class,
            'lawyer_specialization', // pivot table
            'lawyer_id',             // this model’s FK
            'specialization_id'      // related model’s FK
        );
    }

}
