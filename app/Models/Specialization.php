<?php
namespace App\Models;

use App\Models\Specialization;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Specialization extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name'];

    public function lawyers()
    {
        return $this->belongsToMany(
            Lawyer::class,
            'lawyer_specialization',
            'specialization_id',
            'lawyer_id'
        );
    }

}
