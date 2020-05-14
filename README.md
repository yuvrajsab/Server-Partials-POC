# Server Fetched Partial POC

In server side application for getting data without page refresh we generally use `ajax` to get `json` response from server and parse it and somehow convert it to `html` to work with browser. But in Server fetched partials technique you don't need to do that you just have to fetch pre-complied html using `ajax` ofcourse and inject it where ever you want to use it.

## Usage

### Setup an endpoint which returns html response.

Make sure you prefix your endpoints with "/partials" for consistency.

#### Example **Laravel**

```php
// web.php

Route::get('/partials/users', function () {
    return view('partials.users')
        ->withUsers(User::inRandomOrder()
        ->limit(5)
        ->get();
});

// view "partials.users"

@foreach($users as $user)
    <div class="bg-white px-3 py-2 my-4 border">
        <div>
			<div>
                <h4>{{ $user->name }}</h4>
                <p>{{ $user->email }}</p>
            </div>
        </div>
    </div>
@endforeach

```

### Include `ServerPartial.js` script

#### Either `html` include

```html
<!DOCTYPE html>
<html>
	<body>
		<script src="js/ServerPartial.js"></script>
		<script>
			new ServerPartial({
				baseurl: window.location.origin + '/partials/',
			});
		</script>
	</body>
</html>
```

#### Or `js` import

```js
import ServerPartials from 'js/ServerParial.js';

new ServerPartial({
	baseurl: window.location.origin + '/partials/',
});
```

**Full example:**

```html
<!DOCTYPE html>
<html>
	<body>
		<!-- To inject partial on page load -->
		<div id="users-div" load-partial="users"></div>

		<!-- To inject partial on a button click -->
		<button
			class="btn btn-primary"
			onclick="ServerPartial.fetchAndSet('diffrent-users', '#users-div')"
		>
			Fetch
		</button>

		<script src="ServerPartial.js"></script>
		<script>
			new ServerPartial({
				baseurl: window.location.origin + '/partials/',
			});

			// Handle partials content (html) yourself
			async function youcanusefunctions() {
				let html = await ServerPartial.fetch('users');
				//  ...
			}
		</script>
	</body>
</html>
```
