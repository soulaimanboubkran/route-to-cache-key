# route-to-cache-key

A utility for Deno that converts URL routes into cache-friendly keys, handling path segments, query parameters, and special characters.

## Installation

```bash
# Using npx
npx jsr add @soul/route-to-cache-key

# Using Deno
deno add jsr:@soul/route-to-cache-key

# Using Yarn
yarn dlx jsr add @soul/route-to-cache-key

```

```bash
# Import 
import { routeToCacheKey } from "@soul/route-to-cache-key";
# Import from JSR
import { routeToCacheKey } from "jsr:@soul/route-to-cache-key";

# or import from GitHub (alternative)
import { routeToCacheKey } from "https://github.com/soulaimanboubkran/route-to-cache-key/blob/main/mod.ts";
```

## Usage

```typescript
import { routeToCacheKey } from "@soul/route-to-cache-key";

// Basic routes
routeToCacheKey("/user/1234");         // Returns: "user_1234"
routeToCacheKey("/product/abc/detail"); // Returns: "product_abc_detail"

// With query parameters
routeToCacheKey("/user/1234?active=true");  // Returns: "user_1234_active-true"
routeToCacheKey("/search?q=deno&limit=10"); // Returns: "search_q-deno_limit-10"

// Complex paths with multiple query parameters
routeToCacheKey("/api/v2/products?category=electronics&sort=price&order=asc");
// Returns: "api_v2_products_category-electronics_sort-price_order-asc"
```

## How It Works

The function converts routes to cache keys by:
1. Removing the leading slash (if present)
2. Replacing path slashes (`/`) with underscores (`_`)
3. Processing query parameters:
   - Replacing equals signs (`=`) with hyphens (`-`)
   - Replacing ampersands (`&`) with underscores (`_`)
   - Handling special characters like `+` and `%`
4. Removing hash fragments

## API

### `routeToCacheKey(route: string): string`

#### Parameters:
- `route` (string): The URL route to convert (can include query parameters)

#### Returns:
- (string): The formatted cache key

## Use Cases

- Redis cache key generation
- In-memory caching systems
- File naming for cached content
- Database key normalization
- API response caching

## License

MIT

