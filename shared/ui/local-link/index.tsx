import React, { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

export const LocalLink: FC<PropsWithChildren<LinkProps>> = (props) => {
  const router = useRouter();
  const { ref, embed, app, theme } = router.query;
  const { href, ...restProps } = props;

  const extraQuery = {} as Record<string, string>;
  // Not support case: ?ref=01234&ref=56789
  if (ref && typeof ref === 'string') extraQuery.ref = ref;
  if (embed && typeof embed === 'string') extraQuery.embed = embed;
  if (app && typeof app === 'string') extraQuery.app = app;
  if (theme && typeof theme === 'string') extraQuery.theme = theme;

  if (typeof href === 'string') {
    return <Link {...restProps} href={{ pathname: href, query: extraQuery }} />;
  }

  throw new Error('Prop href is not compatible');
};
