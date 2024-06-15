const express = require('express');
const upload = require('../midleware/uploadMiddleware');
const {getRegisteredVehicles,deleteVehicle,UpdateVehicaledata,
    vehicale_owners_vehicle,registerVehicle
} = require('../contollers/vehicleOwnerController');
const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();


router.get('/products', validateToken, getRegisteredVehicles);
router.delete('/products/:id', validateToken, deleteVehicle);
router.put('/products/:id', validateToken, UpdateVehicaledata);
router.get('/:ownerId', vehicale_owners_vehicle);
router.post('/products',validateToken,upload.single('photo'),registerVehicle);



module.exports = router;