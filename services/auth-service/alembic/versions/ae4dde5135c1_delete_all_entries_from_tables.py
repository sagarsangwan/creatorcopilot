"""Delete all entries from tables

Revision ID: ae4dde5135c1
Revises: 0d43de03cdf6
Create Date: 2026-01-06 15:53:39.545888

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ae4dde5135c1"
down_revision: Union[str, Sequence[str], None] = "0d43de03cdf6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.execute("TRUNCATE TABLE 'DBUser' RESTART IDENTITY CASCADE;")


def downgrade() -> None:
    """Downgrade schema."""
    pass
