// 3D Skills Sphere - Interactive Rotation
(function() {
    'use strict';

    const sphere = document.getElementById('skillsSphere');
    if (!sphere) return;

    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationX = 15; // Initial X rotation
    let rotationY = 0; // Initial Y rotation
    let velocityX = 0;
    let velocityY = 0;
    let animationId = null;
    let scale = 1; // Zoom scale
    const damping = 0.95; // Damping factor for momentum

    // Disable CSS animation and take control
    sphere.style.animation = 'none';

    // Start continuous rotation
    function startContinuousRotation() {
        function rotate() {
            if (!isDragging) {
                rotationY += 0.2; // Auto-rotation speed
                updateRotation();
            }
            animationId = requestAnimationFrame(rotate);
        }
        rotate();
    }

    // Handle mouse down
    function handleMouseDown(e) {
        isDragging = true;
        sphere.classList.add('dragging');
        previousMouseX = e.clientX || (e.touches && e.touches[0].clientX);
        previousMouseY = e.clientY || (e.touches && e.touches[0].clientY);
        velocityX = 0;
        velocityY = 0;
    }

    // Handle mouse move
    function handleMouseMove(e) {
        if (!isDragging) return;

        e.preventDefault();
        const currentX = e.clientX || (e.touches && e.touches[0].clientX);
        const currentY = e.clientY || (e.touches && e.touches[0].clientY);

        const deltaX = currentX - previousMouseX;
        const deltaY = currentY - previousMouseY;

        velocityY = deltaX * 0.5;
        velocityX = -deltaY * 0.5;

        rotationY += velocityY;
        rotationX += velocityX;

        // Clamp X rotation to prevent flipping
        rotationX = Math.max(-90, Math.min(90, rotationX));

        updateRotation();

        previousMouseX = currentX;
        previousMouseY = currentY;
    }

    // Handle mouse up
    function handleMouseUp() {
        isDragging = false;
        sphere.classList.remove('dragging');
        applyMomentum();
    }

    // Apply momentum/inertia after drag
    function applyMomentum() {
        if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
            rotationY += velocityY;
            rotationX += velocityX;

            // Clamp X rotation
            rotationX = Math.max(-90, Math.min(90, rotationX));

            velocityX *= damping;
            velocityY *= damping;

            updateRotation();
            requestAnimationFrame(applyMomentum);
        }
    }

    // Update sphere rotation with scale
    function updateRotation() {
        sphere.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${scale})`;
    }

    // Start auto-rotation
    startContinuousRotation();

    // Mouse events
    sphere.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile
    sphere.addEventListener('touchstart', handleMouseDown, { passive: false });
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);

    // Prevent context menu on long press
    sphere.addEventListener('contextmenu', (e) => e.preventDefault());

    // Mouse wheel for zoom effect
    sphere.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        scale = Math.max(0.5, Math.min(1.5, scale + delta));
        updateRotation();
    }, { passive: false });

    // Resume auto-rotation when leaving the page
    let autoRotationTimer;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearTimeout(autoRotationTimer);
        } else {
            autoRotationTimer = setTimeout(() => {
                sphere.classList.remove('dragging');
            }, 3000);
        }
    });

    console.log('%c> 3D Skills Sphere Loaded!', 'color: #64FFDA; font-family: JetBrains Mono; font-size: 12px;');
    console.log('%c> Drag to rotate, scroll to zoom', 'color: #57C7FF; font-family: JetBrains Mono; font-size: 10px;');
})();
