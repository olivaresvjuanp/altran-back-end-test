import {
  Router,
  Request,
  Response
} from 'express';
import {
  validationResult,
  checkSchema
} from 'express-validator';

import { Gnome } from '../../models/Gnome';

const router = Router();

const customValidationResult = validationResult.withDefaults({
  formatter: error => error.param
});

router.get('/get-gnomes/:page', checkSchema({
  page: {
    in: 'params',
    isNumeric: true,
    toInt: true
  }
}), (req, res: Response) => {
  console.log(`GET: /api/gnomes/get-gnomes/:page - typeof :page = ${typeof req.params.page} (IP: ${req.ip}).`);

  const result = customValidationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({
      data: {
        errors: result.array()
      }
    });

    return;
  }

  Gnome
    .find()
    .limit(8)
    .skip((req.params.page * 8) - 8)
    .then(gnomes => {
      res.json({
        payload: {
          gnomes
        }
      });
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

router.get('/get-gnome-details/:id', checkSchema({
  id: {
    in: 'params',
    isNumeric: true,
    toInt: true
  }
}), (req: Request, res: Response) => {
  console.log(`GET: /api/gnomes/get-gnome-details/:id - typeof :id = ${typeof req.params.id} (IP: ${req.ip}).`);

  const result = customValidationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({
      data: {
        errors: result.array()
      }
    });

    return;
  }

  Gnome.findOne({ id: req.params.id })
    .then(gnome => {
      if (gnome) {
        res.json({
          payload: {
            gnome
          }
        });
      } else
        res.sendStatus(404);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

router.get('/get-count', (req: Request, res: Response) => {
  console.log(`GET: /api/gnomes/get-count (IP: ${req.ip}).`);

  Gnome.estimatedDocumentCount((error, count) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.json({
        payload: {
          count
        }
      });
    }
  });
});

router.post('/', checkSchema({
  age: {
    in: 'body',
    exists: true,
    isNumeric: true,
    toInt: true
  },
  friends: {
    in: 'body',
    exists: true,
    isArray: true,
    isString: true
  },
  hairColor: {
    in: 'body',
    exists: true,
    isString: true // choose
  },
  height: {
    in: 'body',
    exists: true,
    isNumeric: true,
    toFloat: true
  },
  id: {
    in: 'body',
    exists: true,
    isNumeric: true,
    toInt: true,
    custom: {
      options: id => {
        return Gnome.findOne({ id })
          .then(gnome => {
            if (gnome)
              return Promise.reject();
          });
      }
    }
  },
  name: {
    in: 'body',
    exists: true,
    isLength: {
      options: {
        min: 1,
        max: 32
      }
    },
    isString: true
  },
  professions: {
    in: 'body',
    exists: true,
    isArray: true,
    isString: true
  },
  thumbnail: {
    in: 'body',
    exists: true,
    isURL: {
      options: {
        protocols: ['http', 'https'],
        require_valid_protocol: true,
        require_protocol: true
      }
    }
  },
  weight: {
    in: 'body',
    exists: true,
    isNumeric: true,
    toFloat: true
  }
}), (req: Request, res: Response) => {
  console.log('POST: /api/gnomes - req.body:', req.body, `(IP: ${req.ip}).`);

  const result = customValidationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({
      payload: {
        errors: result.array()
      }
    });

    return;
  }

  const {
    age,
    friends,
    hairColor,
    height,
    id,
    name,
    professions,
    thumbnail,
    weight
  } = req.body;

  new Gnome({
    age,
    friends,
    hairColor,
    height,
    id,
    name,
    professions,
    thumbnail,
    weight
  })
    .save()
    .then(gnome => {
      res.json({
        payload: { gnome }
      });
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

router.delete('/:id', checkSchema({
  id: {
    in: 'params',
    isNumeric: true,
    toInt: true
  }
}), (req, res: Response) => {
  console.log(`DELETE: /api/gnomes/:id - typeof :id = ${typeof req.params.id} (IP: ${req.ip}).`);

  const result = customValidationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({
      data: {
        errors: result.array()
      }
    });

    return;
  }

  Gnome.findOne({ id: req.params.id })
    .then(gnome => {
      if (gnome) {
        gnome
          .remove()
          .then(() => { res.sendStatus(200); })
          .catch(error => {
            console.error(error);
            res.sendStatus(500);
          });
      } else
        res.sendStatus(404);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

router.patch('/', checkSchema({
  age: {
    in: 'body',
    isNumeric: true,
    toInt: true
  },
  friends: {
    in: 'body',
    isArray: true,
    isString: true
  },
  hairColor: {
    in: 'body',
    isString: true // choose
  },
  height: {
    in: 'body',
    isNumeric: true,
    toFloat: true
  },
  id: {
    in: 'body',
    exists: true,
    isInt: true,
    toInt: true
  },
  name: {
    in: 'body',
    isLength: {
      options: {
        min: 1,
        max: 32
      }
    },
    isString: true
  },
  professions: {
    in: 'body',
    isArray: true,
    isString: true
  },
  thumbnail: {
    in: 'body',
    isURL: {
      options: {
        protocols: ['http', 'https'],
        require_valid_protocol: true,
        require_protocol: true
      }
    }
  },
  weight: {
    in: 'body',
    isNumeric: true,
    toFloat: true
  }
}), (req, res: Response) => {
  console.log('PATCH: /api/gnomes - req.body:', req.body, `(IP: ${req.ip}).`);

  const result = customValidationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({
      payload: {
        errors: result.array()
      }
    });

    return;
  }

  const {
    age,
    friends,
    hairColor,
    height,
    id,
    name,
    professions,
    thumbnail,
    weight
  } = req.body;

  Gnome.findOne({ id })
    .then(gnome => {
      if (gnome) {
        if (age)
          gnome.age = age;

        if (friends)
          gnome.friends = friends;

        if (hairColor)
          gnome.hairColor = hairColor;

        if (height)
          gnome.height = height;

        if (name)
          gnome.name = name;

        if (professions)
          gnome.professions = professions;

        if (thumbnail)
          gnome.thumbnail = thumbnail;

        if (weight)
          gnome.weight = weight;

        gnome
          .save()
          .then(gnome => {
            res.json({
              payload: {
                gnome
              }
            });
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500);
          });
      } else
        res.sendStatus(404);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

export { router as gnomes };
