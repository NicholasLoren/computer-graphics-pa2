import * as THREE from 'three'
/**
 * The scene object.
 * @type {THREE.Scene}
 */
let scene

/**
 * The camera object.
 * @type {THREE.Camera}
 */
let camera

/**
 * The renderer object.
 * @type {THREE.WebGLRenderer}
 */
let renderer

/**
 * The sphere object.
 * @type {THREE.Mesh}
 */
let sphere

/**
 * The light object.
 * @type {THREE.Light}
 */
let light

/**
 * The color array.
 * @type {Array<number>}
 */
const colors = [
  0xff0000, 0xff3300, 0xff6600, 0xff9900, 0xffcc00, 0xffee00, 0x00ff00,
  0x00ff33, 0x00ff66, 0x00ff99, 0x00ffcc, 0x00ffff, 0x00ccff, 0x0099ff,
  0x0066ff, 0x0033ff, 0x0000ff, 0x000000, 0xcc00ff, 0x9900ff, 0x6600ff,
  0x3300ff, 0x0000ff, 0xffff00, 0xffcc00, 0xff9900, 0xff6600, 0xff3300
]

/**
 * The color index.
 * @type {number}
 */
let colorIndex = 0

// Set scene dimensions
const sceneWidth = 800
const sceneHeight = 400

//object speed
let xSpeed = 5
let ySpeed = 5
/**
 * Initializes the scene, camera, renderer, light, and sphere.
 */
function init() {
  // Scene setup
  scene = new THREE.Scene() // Create the scene
  scene.background = new THREE.Color(0x4a4a3a) // Set the background color

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000) // Create the camera
  camera.position.z = 270 // Set the camera position

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true }) // Create the renderer
  renderer.setSize(sceneWidth, sceneHeight) // Set the renderer size
  document.body.appendChild(renderer.domElement) // Append the renderer to the DOM

  // Light setup
  light = new THREE.PointLight(0xffffff, 3, 1000) // Create the light
  light.position.set(-sceneWidth / 2, sceneHeight / 2, 200) // Set the light position
  scene.add(light) // Add the light to the scene
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040) // Create the ambient light
  scene.add(ambientLight) // Add the ambient light to the scene

  // Sphere setup
  const radius = 20 // Set the sphere radius
  const geometry = new THREE.SphereGeometry(radius, 32, 32) // Create the sphere geometry
  const material = new THREE.MeshPhongMaterial({ color: colors[colorIndex] }) // Create the sphere material
  sphere = new THREE.Mesh(geometry, material) // Create the sphere
  sphere.position.set(0, 0, 0) // Set the sphere position
  scene.add(sphere) // Add the sphere to the scene
}

/**
 * Animates the sphere by moving it and checking for collisions with the edges.
 * If a collision is detected, the sphere's direction is reversed and its color is changed.
 */
function animate() {
  requestAnimationFrame(animate)

  // Move the sphere
  sphere.position.x += xSpeed
  sphere.position.y += ySpeed 

  // Check for collisions with edges
  const radius = sphere.geometry.parameters.radius
  if (Math.abs(sphere.position.x) + radius > sceneWidth / 2) {
    // Reverse direction and change color if collision with left or right edge detected
    xSpeed *= -1
    changeColor()
    // Ensure the sphere doesn't get stuck outside the bounds
    sphere.position.x = Math.sign(sphere.position.x) * (sceneWidth / 2 - radius)
  }
  if (Math.abs(sphere.position.y) + radius > sceneHeight / 2) {
    // Reverse direction and change color if collision with top or bottom edge detected
    ySpeed *= -1
    changeColor()
    // Ensure the sphere doesn't get stuck outside the bounds
    sphere.position.y =
      Math.sign(sphere.position.y) * (sceneHeight / 2 - radius)
  }

  renderer.render(scene, camera)
}

function changeColor() {
  colorIndex = (colorIndex + 1) % colors.length
  sphere.material.color.setHex(colors[colorIndex])
}

init()
animate()
/**
 * Main program that demonstrates the principles of color and transformations in computer graphics.
 *
 * This program creates a 3D sphere and animates it across the viewing area.
 * When the sphere encounters an edge of the viewing area, it changes direction and color.
 *
 * The sphere is illuminated with a light-yellow (FFFFAA) light source in a fixed position at the upper left corner.
 * The areas of shadow should also change as the sphere changes position within the view.
 *
 * @author Hidden For Review Purposes
 * @version 1.0
 */
