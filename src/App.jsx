import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLanguages,
  translateText,
} from './redux/actions/translateActions';
import Select from 'react-select';
import { setAnswer } from './redux/slices/translateSlice';


const App = () => {
  const dispatch = useDispatch();
  const languageSlice = useSelector((store) => store.languageSlice);
  const translateSlice = useSelector((store) => store.translateSlice);

  const [text, setText] = useState('');

  const [sourceLang, setSourceLang] = useState({
    value: 'tr',
    label: 'Turkish',
  });
  const [targetLang, setTargetLang] = useState({
    value: 'en',
    label: 'English',
  });

  // api'dan dil verileri al ve store'a aktar
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // diziyi bizden istenen formata çevirdik:
  // objelerin {code,name} keylerini {value,label}'â çevirdik
  // Buradaki map top-level kod olduğu için bielşen her render
  // olduğunda hesaplama tekrardan yapılıyordu. Gerkesiz hesaplamalar
  // projenni hıznı yavaşlatabileceğinden useMemo kullanıp bu sorunun
  // önüne geçtik
  const data = useMemo(
    () =>
      languageSlice.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [languageSlice.languages]
  );

  // değişme
  const handleSwap = () => {
    // select'leri değiştir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // cevap textarea'sında veriyi diğer textarea'ya aktar
    setText(translateSlice.answer);

    // soru textarea'sında veriyi cevap textarea'ya aktar
    dispatch(setAnswer(text));
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>TranslateApp+</h1>
        {/* üst kısım */}
        <div className="upper">
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />

          <button onClick={handleSwap}>Change</button>

          <Select
            value={targetLang}
            onChange={setTargetLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>

        {/* orta kısım */}
        <div className="middle">
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <textarea disabled value={translateSlice.answer} />
            {translateSlice.isLoading && (
              <div className="wrapper">
                <div className="typewriter">
                  <div className="slide">
                    <i></i>
                  </div>
                  <div className="paper"></div>
                  <div className="keyboard"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* alt kısım */}
        <button
          onClick={() =>
            dispatch(translateText({ text, sourceLang, targetLang }))
          }
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;