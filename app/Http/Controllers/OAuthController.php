<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OauthAccessToken;

class OAuthController extends Controller
{
    public function login(Request $request) {
        if(auth()->attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            $user = auth()->user();
            $token = $user->createToken($user->name);
            return response()->json([
                'user' => $user,
                'token' => $token,
                'retainToken' => $request->rememberMe,
            ]);
        }
        return response()->json([
            'errors' => ['email' => ['Invalid log in credentials']]
        ], 401);
    }

    public function logout() {
        $user = auth()->user()->logout();
        return 1;
    }

    public function check() {
        $user = auth('api')->user();

        if(!$user) {
            return response()->json(false);
        }

        return response()->json([
            'user' => $user
        ], 200);

        // $accessToken = OauthAccessToken::where('user_id', $user->id);
        // return response()->json([
        //     'token' => $accessToken,
        //     'user' => $user
        // ], 200);
        // $user = auth()->user();
        // $user->token =

        // return response()->json([
        //     'user' => $user,
        //     'token' => $token
        // ], 200);
    }
}
