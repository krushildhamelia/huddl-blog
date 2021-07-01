import { ChangeEvent, Component } from 'react';
import styles from '@/styles/Autocomplete.module.scss';

type AutocompleteProps = {
  suggestions: string[];
  onSuggestionSelected: (selected: string) => void;
};

type AutocompleteState = {
  filteredSuggestions: string[];
  value: string;
};

export class Autocomplete extends Component<
  AutocompleteProps,
  AutocompleteState
> {
  constructor(props: Readonly<AutocompleteProps>) {
    super(props);
    this.state = {
      filteredSuggestions: [],
      value: ``,
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value ?? ``;
    const { suggestions } = this.props;
    this.setState({
      filteredSuggestions: suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      ),
      value,
    });
  };

  private onClick = (suggestion: string) => {
    const { onSuggestionSelected } = this.props;
    onSuggestionSelected(suggestion);
    this.setState({
      value: ``,
      filteredSuggestions: [],
    });
  };

  render() {
    const { value, filteredSuggestions } = this.state;
    return (
      <div className={styles.autocomplete}>
        <input
          type="text"
          tabIndex={0}
          onChange={this.onChange}
          value={value}
        />
        {filteredSuggestions.length > 0 && (
          <div className={styles.suggestions}>
            {filteredSuggestions.map((suggestion) => (
              <div
                role="button"
                tabIndex={0}
                key={suggestion}
                onClick={() => this.onClick(suggestion)}
                onKeyDown={() => this.onClick(suggestion)}
                className={`${styles.item} touchable`}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
