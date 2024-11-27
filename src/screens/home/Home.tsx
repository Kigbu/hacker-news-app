import React from 'react';
import useApiClient from 'core/hooks/useClient';
import newsService from 'core/services/news.service';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import SafeAreaComp from 'components/Layout/SafeAreaComp';
import AppText from 'components/widgets/Text';
import colors from 'theme/colors';
import {w} from 'utils/responsive';
import {height, width} from 'utils/dimensions';
import useRefresh from 'core/hooks/useRefresh';
import EmptyStoryComp from 'components/Stories/EmptyStoryComp';
import LoadingComp from 'components/LoadingComp/LoadingComp';
import {family} from 'theme';
import HomeStoryItem from 'components/Stories/HomeStoryItem';

export default function HomeScreen() {
  const {client} = useApiClient('');

  const [loading, setLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [stories, setStories] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  React.useEffect(() => {
    initLoad();
  }, [page]);

  const initLoad = async () => {
    setLoading(true);
    const apiCalls = [getStories(page), getJobs(page)];
    //  apiCalls.push();
    Promise.all(apiCalls).finally(() => setLoading(false));
  };

  const getStories = async (page: number) => {
    const limit = 5; // Number of items per page
    const data: any = await newsService.getTopStories(client, page, limit);

    if (data) {
      setStories(prev => [...prev, ...data]);
      setHasMore(data.length === limit);
    } else {
      setHasMore(false);
    }

    // setLoading(false);
    setIsLoadingMore(false);
  };

  const getJobs = async (page: number) => {
    const limit = 5; // Number of items per page
    const data: any = await newsService.getJobStories(client, page, limit);

    if (data) {
      setStories(prev => [...prev, ...data]);
      setHasMore(data.length === limit);
    } else {
      setHasMore(false);
    }

    // setLoading(false);
    setIsLoadingMore(false);
  };

  const initRefresh = async () => {
    setStories([]); // Clear existing stories
    setPage(1); // Reset to the first page
    setHasMore(true); // Reset hasMore
    await getStories(page);
  };

  const {refreshing, onRefresh} = useRefresh([initRefresh]);

  return (
    <SafeAreaComp refreshing={false}>
      <View style={{minHeight: height, gap: w(32)}}>
        {/* News */}
        <View style={{gap: w(12)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <AppText
              type="header"
              style={{
                color: colors.grey950,
                fontSize: w(20),
                fontFamily: family.ExtraBold,
                lineHeight: w(26),
                width: '50%',
              }}>
              News
            </AppText>

            <TouchableOpacity>
              <AppText
                style={{
                  color: colors.primary700,
                  fontSize: w(16),
                  fontFamily: family.ExtraBold,
                  lineHeight: w(18),
                }}>
                See More
              </AppText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={stories}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              gap: w(20),
            }}
            renderItem={({item, index}) => (
              <View key={index.toString()}>
                <HomeStoryItem itemId={item} />
              </View>
            )}
            ListEmptyComponent={() => <EmptyStoryComp />}
            ListFooterComponent={() => {
              if (isLoadingMore) {
                return (
                  <View style={{paddingVertical: 16, alignItems: 'center'}}>
                    <ActivityIndicator size="small" color={colors.grey500} />
                  </View>
                );
              }
              return null;
            }}
          />
        </View>

        {/* Jobs */}

        <View style={{gap: w(12)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <AppText
              type="header"
              style={{
                color: colors.grey950,
                fontSize: w(20),
                fontFamily: family.ExtraBold,
                lineHeight: w(26),
                width: '50%',
              }}>
              Jobs
            </AppText>

            <TouchableOpacity>
              <AppText
                style={{
                  color: colors.primary700,
                  fontSize: w(16),
                  fontFamily: family.ExtraBold,
                  lineHeight: w(18),
                }}>
                See More
              </AppText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={stories}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              gap: w(20),
            }}
            renderItem={({item, index}) => (
              <View key={index.toString()}>
                <HomeStoryItem itemId={item} />
              </View>
            )}
            ListEmptyComponent={() => <EmptyStoryComp />}
            ListFooterComponent={() => {
              if (isLoadingMore) {
                return (
                  <View style={{paddingVertical: 16, alignItems: 'center'}}>
                    <ActivityIndicator size="small" color={colors.grey500} />
                  </View>
                );
              }
              return null;
            }}
          />
        </View>
      </View>

      {loading && <LoadingComp />}
    </SafeAreaComp>
  );
}
