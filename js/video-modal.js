// Video URL (replace with your actual video URL)
const videoUrl = "https://youtube.com/embed/LxcUBOGO4fo";

// Get the modal element
const videoModal = document.getElementById('aboutVideoModal');

// When the modal is shown, set the video src
videoModal.addEventListener('show.bs.modal', function () {
    document.getElementById('aboutVideoFrame').src = videoUrl;
});

// When the modal is hidden, stop the video by clearing the src
videoModal.addEventListener('hide.bs.modal', function () {
    document.getElementById('aboutVideoFrame').src = '';
}); 