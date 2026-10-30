/* enaktif.js - 5 misi belajar dengan melakukan */
(() => {
  'use strict';
  const A = window.App, $ = (s) => document.querySelector(s), R = A.rand;
  const umpan = (el, t, c) => { el.className = 'umpan ' + c; el.textContent = t; };

  function misi1() { // satuan tidak baku: jengkal tangan mengukur meja (ukuran proporsional)
    const MEJA = 126, PX = 3, wadah = $('#m1');
    const ANAK = [{ nama: 'Dina', emoji: '👧', cm: 14, warna: '#ffb4a2' }, { nama: 'Budi', emoji: '👦', cm: 18, warna: '#a2d2ff' }];
    const hasil = []; let i = 0, c = 0;
    const tampil = () => {
      const a = ANAK[i], target = MEJA / a.cm; c = 0;
      wadah.innerHTML = `<h2>Misi 1: Ukur meja pakai jengkal 🖐️</h2><p>Giliran <b>${a.emoji} ${a.nama}</b> (jengkal sekitar ${a.cm} cm). Taruh jengkal satu per satu sampai ujung meja.</p>
        <div class="trek"><div class="meja" style="width:${MEJA * PX}px">🪑 Meja</div><div class="jengkalBaris" id="jb"></div></div>
        <div class="baris"><button id="jt">➕ Taruh jengkal</button><button id="jk" class="sek">➖ Ambil</button><button id="jc">Periksa</button></div><div id="ju" class="umpan info">0 jengkal</div>`;
      const gb = () => { $('#jb').innerHTML = `<span class="jk" style="width:${a.cm * PX}px;background:${a.warna}">🖐️</span>`.repeat(c); $('#ju').textContent = `${c} jengkal ${a.nama}`; };
      $('#jt').onclick = () => { c = Math.min(12, c + 1); gb(); }; $('#jk').onclick = () => { c = Math.max(0, c - 1); gb(); };
      $('#jc').onclick = () => {
        if (c !== target) return umpan($('#ju'), c < target ? 'Belum sampai ujung meja, tambah lagi ya!' : 'Sudah melewati ujung meja, ambil satu ya!', 'salah');
        hasil.push(c); $('#jc').disabled = true;
        if (i === 0) { umpan($('#ju'), `Betul! Meja = ${c} jengkal ${a.nama}.`, 'ok'); wadah.insertAdjacentHTML('beforeend', '<button id="jl">Giliran Budi ➡️</button>'); $('#jl').onclick = () => { i = 1; tampil(); }; }
        else { umpan($('#ju'), `Dina: ${hasil[0]} jengkal. Budi: ${hasil[1]} jengkal. Mejanya sama, hasilnya beda! Kita butuh satuan baku: cm dan m 📏`, 'ok'); A.tandai('enaktif', 'm1'); }
      };
    };
    tampil();
  }
  function misi2() { // penggaris ajaib
    const B = [['✏️ pensil', 134], ['🧽 penghapus', 45], ['🍃 daun', 82], ['👟 sepatu', 213]], [nm, mm] = B[R(0, 3)], wadah = $('#m2');
    wadah.innerHTML = `<h2>Misi 2: Penggaris ajaib 📐</h2><p>Geser <b>${nm}</b> sampai ujungnya tepat di angka <b>0</b>, lalu isi panjangnya.</p>
      <div class="alatx" id="ax"><div class="obj" id="ob">${nm.split(' ')[0]}</div><div id="sk" style="position:absolute;top:60px"></div></div>
      <div class="baris"><label>Geser: <input type="range" id="gs" min="0" max="120" value="${R(30, 100)}" aria-label="Geser benda"></label><label><input type="checkbox" id="zm"> 🔍 Zoom mm</label></div>
      <div class="baris">Panjangnya: <input id="ic" type="number" min="0" aria-label="cm"> cm <input id="im" type="number" min="0" max="9" aria-label="mm"> mm <button id="cek">Periksa</button></div><div id="u2" class="umpan info">Tips: 1 cm punya 10 garis kecil (mm).</div>`;
    let off = +$('#gs').value, px = 40; const ob = $('#ob'), ax = $('#ax');
    const gambar = () => { $('#sk').innerHTML = A.svgPenggaris(25, px); ob.style.width = (mm / 10) * px + 'px'; ob.style.left = 10 + off + 'px'; $('#gs').value = off; };
    gambar();
    $('#gs').oninput = (e) => { off = +e.target.value; gambar(); };
    $('#zm').onchange = (e) => { px = e.target.checked ? 90 : 40; gambar(); };
    let o0 = 0, x0 = 0; A.seret(ob, (x, f) => { if (f === 'mulai') { o0 = off; x0 = x; } else if (f === 'gerak') { off = Math.max(0, Math.min(120, o0 + x - x0)); gambar(); } });
    $('#cek').onclick = () => {
      const u = $('#u2'), c = parseInt($('#ic').value, 10), m = parseInt($('#im').value || '0', 10);
      if (off > 2) return umpan(u, 'Ujung benda belum di angka 0. Geser dulu ya!', 'salah');
      if (isNaN(c)) return umpan(u, 'Isi angka cm dulu ya 😊', 'salah');
      if (c === Math.floor(mm / 10) && m === mm % 10) { umpan(u, `Hebat! ${c} cm ${m} mm = ${c * 10 + m} mm.`, 'ok'); A.tandai('enaktif', 'm2'); } else umpan(u, 'Hampir! Lihat garis cm terakhir, lalu hitung garis kecil (mm) setelahnya.', 'salah');
    };
  }
  function misi3() { // meteran pita
    const B = [['meja', 120], ['pintu', 205], ['tinggi Doni', 135]], [nm, cm] = B[R(0, 2)], wadah = $('#m3');
    wadah.innerHTML = `<h2>Misi 3: Meteran pita 🧵</h2><p>Tarik meteran sampai sepanjang <b>${nm}</b> (${Math.floor(cm / 100)} m ${cm % 100} cm).</p>
      <div class="gulir"><div class="meter" style="width:500px"><div class="tarik" id="tr"></div><div class="gagang" id="gg" role="slider" aria-label="Tarik meteran"></div></div></div>
      <div class="baris"><input type="range" id="rg" min="0" max="250" value="0" aria-label="Panjang meteran"> <b id="rd">0 m 0 cm</b> <button id="c3">Periksa</button></div><div id="u3" class="umpan info">Hasil ditampilkan dalam m dan cm.</div>`;
    let v = 0; const baru = (x) => { v = Math.max(0, Math.min(250, Math.round(x))); $('#tr').style.width = v * 2 + 'px'; $('#rg').value = v; $('#rd').textContent = `${Math.floor(v / 100)} m ${v % 100} cm`; };
    $('#rg').oninput = (e) => baru(+e.target.value);
    A.seret($('#gg'), (x, f) => { if (f !== 'lepas') baru((x - $('.meter').getBoundingClientRect().left) / 2); });
    $('#c3').onclick = () => { const u = $('#u3'); if (Math.abs(v - cm) <= 3) { umpan(u, `Tepat! ${nm} = ${Math.floor(cm / 100)} m ${cm % 100} cm = ${cm} cm.`, 'ok'); A.tandai('enaktif', 'm3'); } else umpan(u, v < cm ? 'Kurang panjang, tarik lagi.' : 'Terlalu panjang, tarik sedikit kembali.', 'salah'); };
  }
  function misi4() { // bangun satuan + peta km
    const wadah = $('#m4'); wadah.innerHTML = `<h2>Misi 4: Bangun satuan 🧱</h2><p>Tambah balok 1 cm sampai jadi 1 dm (10 cm), lalu 1 m (100 cm)!</p>
      <div class="blokWadah" id="bw" aria-label="Balok 1 cm"></div><div class="baris"><button id="p1">+ 1 cm</button><button id="p10">+ 10 cm</button><button id="p0" class="sek">Ulangi</button></div>
      <div id="u4" class="umpan info" aria-live="polite">0 cm</div><h3>🗺️ Peta perjalanan: 1 km = 1000 m</h3><div class="jalan"><span class="org" id="og">🚶</span></div><div class="baris"><button id="jl">Jalan 1 km</button><b id="jr">0 m</b></div>`;
    let c = 0, km = false; const cek = () => { if (c >= 100 && km) A.tandai('enaktif', 'm4'); };
    const gb = () => { $('#bw').innerHTML = c <= 100 ? '<span class="blok"></span>'.repeat(Math.min(c, 100)) : ''; const t = c >= 100 ? `${c} cm = 1 m = 10 dm = ${c * 10} mm 🎉` : c >= 10 ? `${c} cm = ${Math.floor(c / 10)} dm ${c % 10 ? (c % 10) + ' cm' : ''}${c === 10 ? ' (1 dm!)' : ''}` : `${c} cm`; $('#u4').textContent = t; cek(); };
    $('#p1').onclick = () => { c = Math.min(100, c + 1); gb(); }; $('#p10').onclick = () => { c = Math.min(100, c + 10); gb(); }; $('#p0').onclick = () => { c = 0; gb(); };
    $('#jl').onclick = () => { let m = 0; const t = setInterval(() => { m += 100; $('#og').style.left = (m / 1000) * 88 + '%'; $('#jr').textContent = m + ' m' + (m === 1000 ? ' = 1 km 🎉' : ''); if (m >= 1000) { clearInterval(t); km = true; cek(); } }, 400); };
  }
  function misi5() { // tebak panjang
    const B = [['pensil', 150], ['buku tulis', 210], ['sepatu', 230], ['sendok', 160], ['botol minum', 240]]; let n = 0;
    const wadah = $('#m5'); wadah.innerHTML = '<h2>Misi 5: Tebak panjang 🎯</h2><div id="s5"></div>';
    const baru = () => { const [nm, mm] = B[R(0, 4)]; $('#s5').innerHTML = `<p>Berapa cm panjang <b>${nm}</b>? Tebak dulu, lalu ukur!</p><div class="baris"><input id="tb" type="number" min="0" aria-label="Tebakan cm"> cm <button id="uk">Ukur</button></div><div class="gulir" id="pg"></div><div id="u5" class="umpan info">Selesaikan 3 tebakan (${n}/3).</div>`;
      $('#uk').onclick = () => { const t = parseFloat($('#tb').value); if (isNaN(t)) return umpan($('#u5'), 'Tulis tebakanmu dulu ya!', 'salah'); $('#pg').innerHTML = A.svgPenggaris(25, 40) + `<div class="benda" style="width:${mm / 10 * 4 + 0}px;margin-left:10px">${nm}</div>`;
        const d = Math.abs(t - mm / 10); n++; umpan($('#u5'), `Panjang sebenarnya ${mm / 10} cm. Selisih tebakanmu ${String(+d.toFixed(1)).replace('.', ',')} cm. ${d <= 2 ? 'Tebakan jitu! 🎯' : 'Terus berlatih ya!'} (${n}/3)`, 'ok');
        if (n >= 3) A.tandai('enaktif', 'm5'); else setTimeout(baru, 2800); }; };
    baru();
  }
  document.addEventListener('siap', () => { misi1(); misi2(); misi3(); misi4(); misi5(); });
})();
