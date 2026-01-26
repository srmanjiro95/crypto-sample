import { useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/home";

import { CRYPTOS } from "~/data/cryptos";
import { fetchUsdRedisCached } from "~/services/cache/redis.cache";
import type { CryptoCardData, CryptoSymbol } from "~/types/crypto";
import { Dashboard } from "~/components/Dashboard";
import { RouteError } from "~/components/RouteError";
import { requireUser } from "~/utils/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request);

  const symbols = CRYPTOS.map((c) => c.symbol) as CryptoSymbol[];

  // 🔥 Redis snapshot (shared across instances)
  const priceMap = await fetchUsdRedisCached(symbols);

  const btcUsd = priceMap.BTC;

  const cards: CryptoCardData[] = CRYPTOS.map((c) => {
    const usd = priceMap[c.symbol];
    return {
      ...c,
      usd,
      btc: c.symbol === "BTC" ? 1 : usd / btcUsd,
    };
  });
  const fetchedAt = Date.now();

  return {
    cards,
    fetchedAt
  };
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isLoading = navigation.state !== "idle";

  return <Dashboard {...data} isLoading={isLoading} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <RouteError
      error={error}
      title="Error loading cryptocurrencies"
    />
  );
}
