/**
 * Main module for Three.js Computer Graphics example.
 * @module main
 */

import * as THREE from 'three'
import { OrbitControls } from 'https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js'

/**
 * Scene object.
 * @type {THREE.Scene}
 */
let scene

/**
 * Renderer object.
 * @type {THREE.WebGLRenderer}
 */
let renderer

/**
 * Camera object.
 * @type {THREE.PerspectiveCamera}
 */
let camera

/**
 * Polygon object.
 * @type {THREE.Mesh}
 */
let polygon

/**
 * Light object.
 * @type {THREE.PointLight}
 */
let light

/**
 * Ambient light object.
 * @type {THREE.AmbientLight}
 */
let ambientLight

/**
 * Directional light object.
 * @type {THREE.DirectionalLight}
 */
let directionalLight

/**
 * Controls object.
 * @type {OrbitControls}
 */
let controls

init()
animate()

/**
 * Initializes the scene, camera, renderer, and polygon.
 */
function init() {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({ antialias: true })
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x111111, 1)
  document.body.appendChild(renderer.domElement)

  // Adding a light source
  light = new THREE.PointLight(0xffffff)
  light.position.set(10, 10, 10)
  scene.add(light)

  directionalLight = new THREE.DirectionalLight(0xffffff)
  light.position.set(0, 0, 1)
  scene.add(directionalLight)

  // Add ambient light
  ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(ambientLight)

  // Create controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true

  // Adding a polygon
  const polygonGeometry = new THREE.Geometry()
  const vertices = [
    new THREE.Vector3(-1, -1, -1), // 0: Bottom left back
    new THREE.Vector3(1, -1, -1), // 1: Bottom right back
    new THREE.Vector3(1, -1, 1), // 2: Bottom right front
    new THREE.Vector3(-1, -1, 1), // 3: Bottom left front
    new THREE.Vector3(0, 1, 0), // 4: Apex
  ]

  for (let i = 0; i < vertices.length; i++) {
    polygonGeometry.vertices.push(vertices[i])
  }

  polygonGeometry.faces.push(
    // Base
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(0, 2, 3),
    // Sides
    new THREE.Face3(0, 4, 1),
    new THREE.Face3(1, 4, 2),
    new THREE.Face3(2, 4, 3),
    new THREE.Face3(3, 4, 0)
  )

  polygonGeometry.computeFaceNormals()
  // Create the material
  const polygonMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  })

  // Connect the vertices to create a polygon
  polygon = new THREE.Mesh(polygonGeometry, polygonMaterial)
  scene.add(polygon)
  renderer.render(scene, camera)
}

/**
 * Animates the polygon.
 */
function animate() {
  requestAnimationFrame(animate)
  polygon.rotation.x += 0.01
  polygon.rotation.y += 0.01
  polygon.rotation.z += 0.01

  // Update controls
  controls.update()

  renderer.render(scene, camera)
}
