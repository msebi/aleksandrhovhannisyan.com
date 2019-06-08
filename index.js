// Toggles night mode if it's dark out
function autoTransitionToNightMode(){
    var today = new Date();

    if(today.getHours() >= 20 || today.getHours() <= 6) {
        $(document.documentElement).toggleClass('night');
        toggleNightModeLabel();
    }
}

// Toggles the night mode label so the text matches the mode the user is in
function toggleNightModeLabel(){
    if($('.switch').hasClass('night')) {
        $('.switch-container span').html('Dark mode');
    }
    else {
        $('.switch-container span').html('Light mode');
    }
}

$(document).ready(function(){
    
    autoTransitionToNightMode();

    // Give the user the option of transitioning between day/night manually
    $('.switch').click(function(){
        
        $(document.documentElement).toggleClass('night');
        $('.switch').toggleClass('night');
        toggleNightModeLabel();
    })

    // Handles the logic for the collapsibles in the education section
    $('.collapsible').click(function(){
        
        var content = $(this).next();
        var icon = $(this).find('i');

        if(content.css('display') === 'grid'){
            content.css('display', 'none');
            icon.toggleClass('fa-angle-down fa-angle-right');
        } else {
            content.css('display', 'grid');
            icon.toggleClass('fa-angle-right fa-angle-down');
        }

        this.scrollIntoView();
    })

});