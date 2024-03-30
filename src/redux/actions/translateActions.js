import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

// Thunk Aksiyonu
export const getLanguages = createAsyncThunk(
    'translate/getLanguages', 
    async () =>{
// api'den dil verilerini al 
const res = await axios.request(options);

// aksiyonun payload'ı olacak veriyi return etme
return res.data.data.languages;
}
);

// çeviri işlemini yapıp sonucunu store'e aktaran aksiyon
export const translateText = createAsyncThunk(
    "translate/text",
    async ({ text, sourceLang, targetLang }) => {
// istek için gerekli ayarlar
const params = new URLSearchParams();
params.set('source_language', sourceLang.value);
params.set('target_language', targetLang.value);
params.set('text', text);

const options = {
  method: 'POST',
  url: 'https://text-translator2.p.rapidapi.com/translate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 
    '37781a9629mshb2b0eda2ccbb0ebp1ba12ajsn267bb0e69ced',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
  data: params,
};

// yukarıdaki ayarlara göre api isteği atar
  const res = await axios.request(options);

// aksiyonun payload'ını belirleme
  return res.data.data.translatedText;
  }
);