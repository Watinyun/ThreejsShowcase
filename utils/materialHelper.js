export const setMaterial = (parent, material, activeOption) => {
  parent.traverse((o) => {
    const materialMap = {
      sofa: ["sofa", "cushions"],
      pillows: ["pillows"],
    };
    if (o.isMesh && materialMap[activeOption].includes(o.name)) {
      o.material = material;
    }
  });
};

export const setMaterialToMesh = (parent, material, activeOption) =>{
  parent.traverse((o) => {
    const materialMap = {
      sofa: ["Big_minder", "Koltuk_alt", "material_31", "Koltuk_back"],
      pillows: ["kucuk_minder"],
      light:["Light"],
      windows:["Glass_Cerceve", "Cam_Duvar_Cerceve"],
      bar:["material_8"],
      chair:["Bar_Koltuk"]
    };
    if (o.isMesh && materialMap[activeOption].includes(o.material.name)) {
      let name = o.material.name;
      o.material = material;
      o.material.name = name;
    }
  });
}

export const getTextureMaterial = (color) => {
  let texture = new THREE.TextureLoader().load(color.texture);
  texture.repeat.set(color.size[0], color.size[1], color.size[2]);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: color.shininess ? color.shininess : 10,
  });
  return material;
};

export const selectSwatch = (event, theModel, colors, activeOption) => {
  let color = colors[parseInt(event.target.dataset.key)];
  let new_mtl;

  if (color.texture) {
    new_mtl = getTextureMaterial(color);
  } else {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt("0x" + color.color),
      shininess: color.shininess ? color.shininess : 10,
    });
  }
  setMaterial(theModel, new_mtl, activeOption);
};

export const selectedSwatch = (event, theModel, colors, activeOption) => {
  let color = colors[parseInt(event.target.dataset.key)];
  let new_mtl;

  if (color.texture) {
    new_mtl = getTextureMaterial(color);
  } else {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt("0x" + color.color),
      shininess: color.shininess ? color.shininess : 10,
    });
  }
  setMaterialToMesh(theModel, new_mtl, activeOption);
};
