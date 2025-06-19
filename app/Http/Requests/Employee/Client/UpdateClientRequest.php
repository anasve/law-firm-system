<?php

namespace App\Http\Requests\Employee\Client;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            'name'  => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:clients,email,' . $this->route('id'),
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'  => 'Client name is required.',
            'name.string'    => 'Client name must be a valid string.',
            'name.max'       => 'Client name must not exceed 255 characters.',
            'email.required' => 'Client email is required.',
            'email.email'    => 'Provide a valid email address.',
            'email.unique'   => 'This email is already in use.',
        ];
    }
}
