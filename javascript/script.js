const audio = document.getElementById('audio');
      const playBtn = document.getElementById('play');
      const nextBtn = document.getElementById('next');
      const prevBtn = document.getElementById('prev');
      const title = document.getElementById('title');
      const progress = document.getElementById('progress');
      const bar = document.getElementById('bar');
      const vol = document.getElementById('vol');
      const fileInput = document.getElementById('fileInput');
      const cover = document.getElementById('cover');
      
      let songs = [];
      let songIndex = 0;
      
      function loadSong(i) {
        const song = songs[i];
        audio.src = song.src;
        title.textContent = song.title;
      }
      
      function playSong() {
        audio.play();
        playBtn.textContent = '⏸️';
      }
      
      function pauseSong() {
        audio.pause();
        playBtn.textContent = '▶️';
      }
      
      playBtn.addEventListener('click', () => {
        if (!songs.length) return;
        audio.paused ? playSong() : pauseSong();
      });
      
      nextBtn.addEventListener('click', () => {
        if (!songs.length) return;
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songIndex);
        playSong();
      });
      
      prevBtn.addEventListener('click', () => {
        if (!songs.length) return;
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songIndex);
        playSong();
      });
      
      audio.addEventListener('timeupdate', () => {
        const pct = (audio.currentTime / audio.duration) * 100;
        bar.style.width = pct + '%';
      });
      
      progress.addEventListener('click', e => {
        if (!songs.length) return;
        const rect = progress.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
      });
      
      vol.addEventListener('input', () => audio.volume = vol.value);
      
      // وقتی آهنگ تموم شد خودکار بعدی
      audio.addEventListener('ended', () => nextBtn.click());
      
      // انتخاب فایل‌ها از لپ‌تاپ
      fileInput.addEventListener('change', () => {
        songs = [];
        for (const file of fileInput.files) {
          const url = URL.createObjectURL(file);
          songs.push({ title: file.name, src: url });
        }
        if (songs.length) {
          songIndex = 0;
          loadSong(songIndex);
          cover.src = "https://www.jowhareh.com/images/Jowhareh/galleries_2/large_31895cb7-ce00-4b5f-88d4-de5a40140322.webp"; // تصویر ثابت
          title.textContent = songs[0].title;
        }
      });