import { CanActivateChildFn } from '@angular/router';
import { supabase } from './core/supabase';

export const authGuardGuard: CanActivateChildFn = async (route, state) => {

 const {data} = await supabase.auth.getSession()

  return !!data.session;
};
