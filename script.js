// DOM Elements
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const toggleBtn = document.getElementById("toggle-playlist");
const playlist = document.querySelector(".playlist");
 // Playlist
const songs = [
  { title: "Dooron Dooron", artist: "Paresh Pahuja", src: "songs/Dooron_Dooron.mp3", cover: "photos/Dooron.jpg" },
  { title: "Ishqa Ve", artist: "Zeeshan Ali", src: "songs/Ishqa_Ve.mp3", cover: "photos/ishqa ve.jpg" },
  { title: "Khayaal", artist: "Talwiinder", src: "songs/Khayaal.mp3", cover: "photos/khayaal.jpg" },
  { title: "Pal Pal", artist: "Talwiinder", src: "songs/Pal_Pal.mp3", cover: "photos/pall.png" },
  { title: "Pal Pal Dil ke Paas", artist: "Arijit Singh", src: "songs/Pal Pal Dil Ke Paas.mp3", cover: "photos/pal-pal.jpg" },
  { title: "Tere Liye", artist: "Atif Askam", src: "songs/Tere Liye.mp3", cover: "photos/tere liye.jpg" },
  { title: "Until I Found You", artist: "Stephen Sanchez", src: "songs/Until_I_Found_You.mp3", cover: "photos/until.jpg" }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

// Play song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
 }
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Format time helper
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Build playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
    updatePlaylist();
  });
  playlistEl.appendChild(li);
});

// Highlight active song
function updatePlaylist() {
  [...playlistEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === songIndex);
  });
}

toggleBtn.addEventListener("click", () => {
    if (playlist.style.display === "none" || playlist.style.display === "") {
        playlist.style.display = "block";
        toggleBtn.textContent = "Hide Playlist";
    } else {
        playlist.style.display = "none";
        toggleBtn.textContent = "Show Playlist";
    }
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Navigation buttons
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initialize
loadSong(songs[songIndex]);
updatePlaylist();