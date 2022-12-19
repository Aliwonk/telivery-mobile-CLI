import {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

const SearchBar: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Searchbar
      placeholder="Поиск"
      onChangeText={onChangeSearch}
      style={styles.search}
      elevation={1}
      value={searchQuery}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  search: {
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
