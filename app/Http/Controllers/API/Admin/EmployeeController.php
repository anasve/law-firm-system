<?php
namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
      // ✅ Get all specializations (optional search)
    public function index(Request $request)
    {
        $query = Specialization::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $specializations = $query->latest()->get();

        if ($specializations->isEmpty()) {
            return response()->json(['message' => 'No specializations found.'], 404);
        }

        return response()->json($specializations);
    }

    // ✅ Show one specialization
    public function show($id)
    {
        $spec = Specialization::findOrFail($id);
        return response()->json($spec);
    }

    // ✅ Store new specialization (no validation used)
    public function store(Request $request)
    {
        $data = $request->only(['name', 'description']);
        $spec = Specialization::create($data);

        return response()->json([
            'message' => 'Specialization created successfully',
            'specialization' => $spec,
        ], 201);
    }

    // ✅ Update specialization (no validation used)
    public function update(Request $request, $id)
    {
        $spec = Specialization::findOrFail($id);
        $data = $request->only(['name', 'description']);

        $spec->update($data);

        return response()->json([
            'message' => 'Specialization updated successfully',
            'specialization' => $spec,
        ]);
    }

    // ✅ Soft delete (archive)
    public function destroy($id)
    {
        $spec = Specialization::findOrFail($id);
        $spec->delete();

        return response()->json(['message' => 'Specialization archived']);
    }

    // ✅ List archived specializations
    public function archived()
    {
        $archived = Specialization::onlyTrashed()->latest()->get();
        return response()->json($archived);
    }

    // ✅ Restore archived specialization
    public function restore($id)
    {
        $spec = Specialization::onlyTrashed()->findOrFail($id);
        $spec->restore();

        return response()->json(['message' => 'Specialization restored successfully']);
    }

    // ✅ Force delete permanently
    public function forceDelete($id)
    {
        $spec = Specialization::onlyTrashed()->findOrFail($id);
        $spec->forceDelete();

        return response()->json(['message' => 'Specialization permanently deleted']);
    }
}
