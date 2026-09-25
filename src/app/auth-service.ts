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

async getSession(){
  const {data , error } = await supabase.auth.getSession()

  if(error){
    console.log(error)
    return false
  }

  return data.session
}

async logout(){
  await supabase.auth.signOut();
}

}
