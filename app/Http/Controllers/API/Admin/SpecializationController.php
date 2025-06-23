<?php
namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Specialization;
use Illuminate\Http\Request;

class SpecializationController extends Controller
{ public function index()
    {
        return response()->json(Specialization::latest()->get());
    }

    // ✅ إنشاء اختصاص جديد بدون تحقق
    public function store(Request $request)
    {
        $data = $request->only(['name', 'description']);
        $spec = Specialization::create($data);

        return response()->json([
            'message' => 'Specialization created successfully',
            'specialization' => $spec,
        ], 201);
    }

    // ✅ عرض اختصاص محدد (بما فيه الوصف)
    public function show($id)
    {
        $spec = Specialization::findOrFail($id);
        return response()->json($spec);
    }

    // ✅ تحديث اختصاص بدون تحقق
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

    // ✅ أرشفة (حذف ناعم)
    public function destroy($id)
    {
        $spec = Specialization::findOrFail($id);
        $spec->delete();

        return response()->json(['message' => 'Specialization archived']);
    }

    // ✅ عرض الاختصاصات المؤرشفة فقط
    public function archived()
    {
        $archived = Specialization::onlyTrashed()->latest()->get();
        return response()->json($archived);
    }

    // ✅ استعادة اختصاص مؤرشف
    public function restore($id)
    {
        $spec = Specialization::onlyTrashed()->findOrFail($id);
        $spec->restore();

        return response()->json(['message' => 'Specialization restored successfully']);
    }

    // ✅ حذف دائم
    public function forceDelete($id)
    {
        $spec = Specialization::onlyTrashed()->findOrFail($id);
        $spec->forceDelete();

        return response()->json(['message' => 'Specialization permanently deleted']);
    }
}
