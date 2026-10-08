export const KEYS={menu:'savora_menu',categories:'savora_categories',customers:'savora_customers',orders:'savora_orders',settings:'savora_settings'};
export const load=(key,fallback)=>{try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}};
export const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
export const uid=(prefix='ID')=>`${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
