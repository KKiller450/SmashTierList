<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Entries;

class EntriesController extends Controller
{
    function show(Request $request)
    {
        // return $request;
        $data = Entries::orderBy($request->column, $request->sortDirection);
        if ($request->queryString != '') {
            $columns = array(
                'votes',
                'name',
                'tag',
                'location',
                'character'
            );
            for($i = 0; $i < count($columns); $i++){
                $data = $data->orWhere($columns[$i], 'LIKE', '%'.$request->queryString.'%');
            }
        }
        return $data->get();
    }
    function insert(Request $request)
    {

        // $test = response()->json([$request->all()]);
        // echo $test;
        // return;

       $entries = new Entries;
       $entries->name = $request->name;
       $entries->tag = $request->tag;
       $entries->location = $request->location;
       $entries->votes = $request->votes;
       $entries->character = $request->character;
       $entries->save();

    }
    function delete($id)
    {
        $data = Entries::find($id);
        $data->delete();
    }
    function update(Request $request)
    {
        $data = Entries::find($request->id);
        $data->votes = $request->votes;
        $data->save();
    }
}
