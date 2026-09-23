import { inject, Injectable } from '@angular/core';
import { supabase } from './core/supabase';
import { LoginData } from './login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


async login(loginData:LoginData){
  const {data, error} = await supabase.auth.signInWithPassword(loginData)
  if(error){
    return false
  }else{
    return data
  } 
}

async logout(){
  await supabase.auth.signOut();
}

}
