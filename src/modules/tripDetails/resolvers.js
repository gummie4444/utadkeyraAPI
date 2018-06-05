// App Imports
import models from '../../setup/models';
import params from '../../config/params.json';

// REMEMBER async function is always wrapped in a promise

// Create TripDetails
export async function create(
  parentValue,
  {
    tripId, email, name, notes, phone, mobile, seats, smokeStatus,
  },
  { auth },
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.TripDetails.create({
      tripId,
      email,
      name,
      notes,
      phone,
      mobile,
      seats,
      smokeStatus,
    });
  }
  throw new Error('Operation denied.');
}

// Update trip
export async function update(
  parentValue,
  {
    id, tripId, email, name, notes, phone, mobile, seats, smokeStatus,
  },
  { auth },
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.TripDetails.update(
      {
        tripId,
        email,
        name,
        notes,
        phone,
        mobile,
        seats,
        smokeStatus,
      },
      { where: { id } },
    );
  }
  throw new Error('Operation denied.');
}

// Delete Trip
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.TripDetails.destroy({ where: { id } });
  }
  throw new Error('Operation denied.');
}
